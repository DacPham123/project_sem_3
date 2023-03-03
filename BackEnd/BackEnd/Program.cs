using BackEnd.Converters;
using BackEnd.Models;
using BackEnd.Services;
using BackEnd.WebsocketMessages;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.Converters.Add(new BackEnd.Converters.DateConverter());
});

builder.Services.AddDbContext<DatabaseContext>(options => options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]));

builder.Services.AddScoped<CateTOFHouseService, CateTOFHouseServiceImpl>();
builder.Services.AddScoped<NewsTypeService, NewsTypeServiceImpl>();
builder.Services.AddScoped<NewsService, NewsServiceImpl>();
builder.Services.AddScoped<AccountService, AccountServiceImpl>();
builder.Services.AddScoped<WardService, WardServiceImpl>();
builder.Services.AddScoped<ProvinceService, ProvinceServiceImpl>();
builder.Services.AddScoped<CityService, CityServiceImpl>();
builder.Services.AddScoped<CategoryService, CategoryServiceImpl>();
builder.Services.AddScoped<ContactService, ContactServiceImpl>();
builder.Services.AddScoped<NewsImagesService, NewsImagesServiceImpl>();
builder.Services.AddScoped<PackageService, PackageServiceImpl>();
builder.Services.AddScoped<InvoiceService, InvoiceServiceImpl>();
builder.Services.AddScoped<ReportNewsService, ReportNewsServiceImpl>();

builder.Services.AddScoped<IMessageRepository, MessageRepository>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();


builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
    {
        option.RequireHttpsMetadata = false;
        option.SaveToken = true;
        option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };

        /// SignalR authentication: get token from query String
        option.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    }
);

/**
 * SignalR - WebSocket connection
 */
builder.Services.AddSignalR();
builder.Services.AddSingleton<PresenceTracker>();


var app = builder.Build();
app.UseStaticFiles();
app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<MessageHub>("hubs/message");
app.MapHub<PresenceHub>("hubs/presence");

app.Run();
