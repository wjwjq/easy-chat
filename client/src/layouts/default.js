import React from 'react';

export default function Layout(props) {
    return (
        <section className="section">
            { props.children }
        </section>
    );
}