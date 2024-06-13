using AutoMapper;
using Core.Entities;
using Application.DTOs;

namespace Application.Mappings
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<User, UserDto>().ReverseMap();
		}
	}
}
