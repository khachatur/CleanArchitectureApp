using System.Text.RegularExpressions;

namespace Core.ValueObjects
{
	public class Email
	{
		private static readonly Regex EmailRegex = new Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled);

		public string Value { get; }

		public Email(string value)
		{
			if (!EmailRegex.IsMatch(value))
			{
				throw new ArgumentException("Invalid email format", nameof(value));
			}
			Value = value;
		}

		// Other methods and overrides (e.g., Equals, GetHashCode)
	}
}
