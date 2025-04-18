import './ErrorPage.css'

// Componente ErrorPage renderiza uma página de erro 404 personalizada.
// Utiliza classes do Bootstrap para centralizar e estilizar o conteúdo.

export default function ErrorPage() {
    return (
        <div className="custom-bg text-dark"> {/* Fundo personalizado, texto escuro */}
            <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
                {/* Flex container que centraliza vertical e horizontalmente na tela inteira */}
                <div className="text-center"> {/* Centraliza o texto no conteúdo */}
                    <h1 className="display-1 fw-bold">404</h1> {/* Título grande para o código de erro */}
                    <p className="fs-2 fw-medium mt-4">Oops! Page not found</p> {/* Mensagem secundária */}
                    <p className="mt-4 mb-5">
                        The page you're looking for doesn't exist or has been moved.
                    </p> {/* Explicação adicional */}
                    <a href="/" className="btn btn-light fw-semibold rounded-pill px-4 py-2 custom-btn">
                        Voltar Para Home
                    </a> {/* Botão para voltar à página inicial */}
                </div>
            </div>
        </div>
    );
}
