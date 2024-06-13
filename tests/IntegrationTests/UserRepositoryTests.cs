using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Core.Entities;

namespace IntegrationTests
{
	public class UserRepositoryTests
	{
		private readonly ApplicationDbContext _context;

		public UserRepositoryTests()
		{
			var options = new DbContextOptionsBuilder<ApplicationDbContext>()
				.UseInMemoryDatabase(databaseName: "TestDatabase")
				.Options;

			_context = new ApplicationDbContext(options);
		}

		[Fact]
		public async Task AddUserAsync_AddsUser()
		{
			// Arrange
			var user = new User { Name = "John Doe", Email = "john@example.com", Role = "Admin" };

			// Act
			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			// Assert
			var addedUser = await _context.Users.FindAsync(user.Id);
			Assert.NotNull(addedUser);
			Assert.Equal("John Doe", addedUser.Name);
		}

		// Additional tests...
	}
}
