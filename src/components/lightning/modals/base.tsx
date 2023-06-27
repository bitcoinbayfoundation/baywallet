import React from 'react';
import {Layout} from '@ui-kitten/components';

export const BaseModal = ({children}) => {
  return (
    <Layout
      style={{
        width: '75%',
        height: '50%',
        borderWidth: 1,
        borderColor: '#AAA',
        borderRadius: 25,
        position: 'absolute',
        top: 150,
        left: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </Layout>
  );
};
