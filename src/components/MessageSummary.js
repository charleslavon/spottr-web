import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import '../styles/inbox.scss';

const MessageSummary = props => {

    return (
        <section className="message-summary">
            <Link to={"inbox/"+props.id}>
                <article className="convoLink">
                    <iron-icon id="chatIconId" icon="communication:chat-bubble-outline"/>
                    <span className="with">{props.with}</span>
                    <div><span className="hace">Recebido hace {props.sent}</span></div>
                </article>
            </Link>
        </section>
    );
};

MessageSummary.propTypes = {
    with: PropTypes.string.required,
    id: PropTypes.string.required,
    sent: PropTypes.string.required
};

export default MessageSummary;