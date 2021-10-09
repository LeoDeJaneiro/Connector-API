import { Tag } from '../tags.model';

export const tagsRaw = [
  {
    Name: 'React5_temp001',
    Description: 'Reactor 5 - Cooling water temperature',
    Units: 'C',
    Type: 'ANALOG',
  },
  {
    Name: 'React5_press',
    Description: 'Reactor 5 - Top pressure',
    Units: '',
    Type: 'ANALOG',
  },
  {
    Name: 'React5_phas',
    Description: 'Reactor 5 - Production Phases',
    Units: '',
    Type: 'STRING',
  },
];

export const getTagClasses = (): Tag[] => {
  return tagsRaw.map(
    ({ Name, Description, Units, Type }) =>
      new Tag(Name, Description, Units, Type),
  );
};
