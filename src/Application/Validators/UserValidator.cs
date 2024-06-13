using FluentValidation;
using Application.DTOs;

namespace Application.Validators
{
	public class UserValidator : AbstractValidator<UserDto>
	{
		public UserValidator()
		{
			RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
			RuleFor(x => x.Email).NotEmpty().MaximumLength(100).EmailAddress();
			RuleFor(x => x.Role).NotEmpty().MaximumLength(50);
			RuleFor(x => x.ProfilePictureUrl).MaximumLength(250);
		}
	}
}
