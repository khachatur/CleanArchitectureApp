using Application.Interfaces;
using Core.Entities;

namespace Core.Interfaces
{
	public interface IUserRepository : IRepository<User>
	{
		// Additional specific user-related methods can be added here if needed.
	}
}
