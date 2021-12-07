import React, {PureComponent} from 'react';
import {ChangeEvent} from 'react';
import s from '../../styles/ProfileInfo.module.css'

type ProfileStatusProps = {
    status: string
    updateUserStatus: (status: string) => void
}

class ProfileStatus extends PureComponent<ProfileStatusProps> {

    state = {
        editMode: false,
        status: this.props.status
    }

    onEditMode = () => {
        this.setState({editMode: true})
    }

    offEditMode = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusProps>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status)
            this.setState({status: this.props.status})
    }

    render() {
        return <div className={s.status}>
            {
                this.state.editMode
                    ? <input
                        className={s.statusInput}
                        type="text"
                        value={this.state.status}
                        onBlur={this.offEditMode}
                        onChange={this.onStatusChange}
                        autoFocus
                    />
                    : <div onClick={this.onEditMode}>
                        {this.props.status || 'Set status...'}
                    </div>
            }
        </div>

    }
}

export default ProfileStatus;