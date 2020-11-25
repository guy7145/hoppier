import React from 'react'
import classNames from 'classnames';
import sepClasses from './separator.less';


export default function Separator({vertical=true, classes=[]}) {
    return <div className={classNames([
        sepClasses.separator, vertical ? sepClasses.vertical : sepClasses.horizontal, ...classes
    ])}/>
}
