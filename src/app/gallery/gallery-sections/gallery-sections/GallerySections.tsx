import * as React from 'react';
import {GallerySectionTile} from '../GallerySectionTile';
import {Item, LinkItem} from '../../../layout/components/item/Item';
import {Button} from '../../../layout/components/button/Button';
import './GallerySections.scss';
import {Card} from '../../../layout/components/card/Card';
import {Headline} from '../../../layout/components/headline/Headline';

export const GallerySections = ({user, sections, content, onCreateSection, onDeleteSection}) => (
  <Card className={'gallery-sections'}>
    <Headline text={'Hallo {{username}}'.replace('{{username}}', user.name)} icon={'favorite'}/>
    <Item>
      Hier kannst du dir alle Bilder unserer Hochzeit ansehen und selbst Neue hochladen.
    </Item>
    <Item>
      <Button htmlType={'button'}
              block
              onClick={onCreateSection}>
        Neue Gallerie
      </Button>
    </Item>
    {sections.map((section, index) => (
      <LinkItem target={`/gallery/sections/${section.id}`}
                key={index}>
        <GallerySectionTile onDelete={() => onDeleteSection(section)}
                            user={user}
                            section={section}/>
      </LinkItem>
    ))}
  </Card>
);
