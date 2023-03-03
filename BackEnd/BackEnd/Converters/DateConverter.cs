using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
namespace BackEnd.Converters
{
    public class DateConverter : JsonConverter<DateTime>
    {
        private string formatDate = "yyyy-MM-dd";
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)//bien kieu json thanh kieu du lieu
        {
            return DateTime.ParseExact(reader.GetString(), formatDate, CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)// bien kieu du lieu thanh chuoi json
        {
            writer.WriteStringValue(value.ToString(formatDate));
        }
    }
}
