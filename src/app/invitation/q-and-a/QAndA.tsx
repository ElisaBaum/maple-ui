import * as React from 'react';
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {QAndAData} from "./QAndAData";
import {Headline} from "../../layout/components/headline/Headline";
import {Card} from '../../layout/components/card/Card';
import {Item} from "../../layout/components/item/Item";

export function QAndA({content}: ContentComponentProps<QAndAData>) {
  const {questions} = content;
  return (
    <div className="q-and-a">
      {
        questions.map((question, index) => (
          <Card key={index}>
            <Headline text={question.question} icon={question.icon}/>
            <Item>
              {question.answer.map((text, i) => (<p key={i}>{text}</p>))}
            </Item>
          </Card>
        ))
      }
    </div>
  );
}
