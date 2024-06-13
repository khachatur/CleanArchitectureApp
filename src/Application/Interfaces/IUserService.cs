using Application.DTOs;

namespace Application.Interfaces
{
	public interface IUserService
	{
		Task<IEnumerable<UserDto>> GetUsersAsync();
		Task<UserDto> GetUserByIdAsync(int id);
		Task AddUserAsync(UserDto userDto);
		Task UpdateUserAsync(UserDto userDto);
		Task DeleteUserAsync(int id);
	}
}
