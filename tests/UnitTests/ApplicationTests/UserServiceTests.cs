using Xunit;
using Moq;
using Application.Interfaces;
using Application.Services;
using Core.Entities;
using Core.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTOs;

namespace UnitTests.ApplicationTests
{
	public class UserServiceTests
	{
		private readonly Mock<IUserRepository> _userRepositoryMock;
		private readonly IMapper _mapper;
		private readonly IUserService _userService;

		public UserServiceTests()
		{
			_userRepositoryMock = new Mock<IUserRepository>();
			var config = new MapperConfiguration(cfg => cfg.AddProfile(new Application.Mappings.MappingProfile()));
			_mapper = config.CreateMapper();
			_userService = new UserService(_userRepositoryMock.Object, _mapper);
		}

		[Fact]
		public async Task GetUsersAsync_ReturnsAllUsers()
		{
			// Arrange
			var users = new List<User>
			{
				new User { Id = 1, Name = "John Doe", Email = "john@example.com", Role = "Admin" },
				new User { Id = 2, Name = "Jane Doe", Email = "jane@example.com", Role = "User" }
			};
			_userRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(users);

			// Act
			var result = await _userService.GetUsersAsync();

			// Assert
			Assert.NotNull(result);
			Assert.Equal(2, result.Count());
		}

		[Fact]
		public async Task GetUserByIdAsync_ReturnsUser()
		{
			// Arrange
			var user = new User { Id = 1, Name = "John Doe", Email = "john@example.com", Role = "Admin" };
			_userRepositoryMock.Setup(repo => repo.GetByIdAsync(user.Id)).ReturnsAsync(user);

			// Act
			var result = await _userService.GetUserByIdAsync(user.Id);

			// Assert
			Assert.NotNull(result);
			Assert.Equal(user.Id, result.Id);
		}

		[Fact]
		public async Task AddUserAsync_CreatesUser()
		{
			// Arrange
			var userDto = new UserDto { Name = "John Doe", Email = "john@example.com", Role = "Admin" };
			var user = new User { Id = 1, Name = "John Doe", Email = "john@example.com", Role = "Admin" };
			_userRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<User>())).Returns(Task.CompletedTask);

			// Act
			await _userService.AddUserAsync(userDto);

			// Assert
			_userRepositoryMock.Verify(repo => repo.AddAsync(It.IsAny<User>()), Times.Once);
		}

		[Fact]
		public async Task UpdateUserAsync_UpdatesUser()
		{
			// Arrange
			var userDto = new UserDto { Id = 1, Name = "John Doe", Email = "john@example.com", Role = "Admin" };
			var user = new User { Id = 1, Name = "John Doe", Email = "john@example.com", Role = "Admin" };
			_userRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<User>())).Returns(Task.CompletedTask);

			// Act
			await _userService.UpdateUserAsync(userDto);

			// Assert
			_userRepositoryMock.Verify(repo => repo.UpdateAsync(It.IsAny<User>()), Times.Once);
		}

		[Fact]
		public async Task DeleteUserAsync_DeletesUser()
		{
			// Arrange
			var user = new User { Id = 1, Name = "John Doe", Email = "john@example.com", Role = "Admin" };
			_userRepositoryMock.Setup(repo => repo.DeleteAsync(user.Id)).Returns(Task.CompletedTask);

			// Act
			await _userService.DeleteUserAsync(user.Id);

			// Assert
			_userRepositoryMock.Verify(repo => repo.DeleteAsync(user.Id), Times.Once);
		}
	}
}
