using System.ComponentModel.DataAnnotations;

namespace Presentation.API.Models
{
	public class UserModel
	{
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
