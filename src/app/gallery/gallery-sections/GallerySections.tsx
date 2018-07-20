import * as React from 'react';
import {GallerySectionTile} from './GallerySectionTile';
import {LinkItem} from '../../layout/components/item/Item';

export const GallerySections = ({user, sections, onDeleteSection}) => (
  <div>
    {sections.map((section, index) => (
      <LinkItem target={`/gallery/sections/${section.id}`}
                key={index}>
        <GallerySectionTile onDelete={() => onDeleteSection(section)}
                            user={user}
                            section={section}/>
      </LinkItem>
    ))}
  </div>
);
