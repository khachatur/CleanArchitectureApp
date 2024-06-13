using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
	public class User
	{
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public required string Name { get; set; }

		[Required]
		[MaxLength(100)]
		[EmailAddress]
		public required string Email { get; set; }

		[Required]
		[MaxLength(50)]
		public required string Role { get; set; }

		[MaxLength(250)]
		public string ProfilePictureUrl { get; set; } = string.Empty;
	}
}