import React from 'react';
import { Category } from '../../interfaces/RecordEntities';
import { RecordIndex } from '../Record';
import { CategoryListItem } from './ListItem';

export const CategoryIndex: React.FC = () => {
    const apiOptions = { relations: ['order'] };

    return {
        <RecordIndex<Category> ListItem={CategoryListItem} apiPath="categories" apiOptions={apiOptions} />
    }
}
