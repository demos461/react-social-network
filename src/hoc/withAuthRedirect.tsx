import React, {ComponentType} from 'react';
import {AppRootStateType} from '../redux/store';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

type mapStateToPropsType = {
    isAuth: boolean
}

export function WithAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: mapStateToPropsType) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>

        return <Component {...restProps as T} />
    }

    return connect(mapStateToProps)(RedirectComponent)
}

const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}
