import React from 'react';
import { Container } from 'react-bootstrap'
import './styles.css';

export default function FooterBar() {
    return (
        <footer class="Footer">
            <Container>
                <p className="text-center pFooter">Copyright &copy; Leonardo Sampaio da Cruz 2019</p>
            </Container>
        </footer>
    );
}
