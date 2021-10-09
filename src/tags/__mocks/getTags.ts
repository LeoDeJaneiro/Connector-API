import { Tag } from '../tags.model';
import { getTagClasses } from './Tag';

export const getTags = (): Promise<Tag[]> => {
  return new Promise((resolve) => {
    resolve(getTagClasses());
  });
};
