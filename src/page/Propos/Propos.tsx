import React from 'react';
import '../Propos/_propos.scss';
import Collapse from '../../components/Collapse/Collapse';
import CollapseAPropos from '../../JSON/CollapseAPropos.json';

const Propos = (): JSX.Element => {
      return (
            <>
                  {CollapseAPropos.map((item) => (
                        <Collapse
                              key={item.title}
                              title={item.title}
                              content={item.content}
                        />
                  ))}
            </>
      );
};

export default Propos;
