export const mockUserProfile = {
  name: 'John Smith',
  email: 'johnsmith@gmail.com',
  phone: '+61 123 123 123',
  bio: 'johnsmiths bio',
  experience: [
    {
      description: 'johnsmith',
      end_date: '2020',
      start_date: '2020',
      title: 'johnsmiths experience',
    },
  ],
  education: [
    {
      description: 'johnsmith',
      end_date: '2020',
      start_date: '2020',
      title: 'johnsmith',
    },
  ],
  achievements: [
    {
      description: 'johnsmith',
      title: 'johnsmith',
    },
  ],
};

export const mockEmptyUserProfile = {
  name: 'John Smith',
  email: 'johnsmith@gmail.com',
  phone: '',
  bio: '',
  experience: [],
  education: [],
  achievements: [],
};

export const mockResults = {
  users: [
    {
      name: 'John Smith',
      userId: 0,
      achievements: {
        null: 'null',
      },
      pic: 'mockImage.jpg',
      phone: '',
      education: {
        null: 'null',
      },
      email: 'johnsmith@gmail.com',
      experience: {
        null: 'null',
      },
    },
  ],
  projects: [
    {
      creationDate: '2020-10-15',
      description: "Johnsmith's project",
      name: 'Project John',
      ownerId: 0,
      projectId: '-MJdrg2IIN7vh9owhLZN',
      visibility: 'Public',
    },
  ],
};

export const mockEmptyResults = {
  users: [],
  projects: [],
};

export const mockViewUser = {
  name: 'John Smith',
  email: 'johnsmith@gmail.com',
  phone: '+61 123 123 123',
  bio: 'johnsmiths bio',
  image: 'mockImage.jpg',
  resume: 'https://www.resume.com/',
  experience: [
    {
      description: 'johnsmith',
      end_date: '2020',
      start_date: '2020',
      title: 'johnsmiths experience',
    },
  ],
  education: [
    {
      description: 'johnsmith',
      end_date: '2020',
      start_date: '2020',
      title: 'johnsmith',
    },
  ],
  achievements: [
    {
      description: 'johnsmith',
      title: 'johnsmith',
    },
  ],
  projects: {
    MIrxBOa3tPEl3NyrqD: 'Project John',
    MIrxBOa3tPEl3NyrqE: 'Project John Second',
  },
};
