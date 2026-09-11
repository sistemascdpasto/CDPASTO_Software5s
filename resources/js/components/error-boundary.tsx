import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    huboError: boolean;
}

/**
 * Red de seguridad para toda la app: sin esto, cualquier error no controlado
 * durante un render (p. ej. el DOM alterado por una extensión de traducción
 * del navegador, o un chunk viejo tras un deploy) hace que React desmonte todo
 * el árbol y deje la pantalla en blanco sin ningún mensaje. Con esto, se
 * muestra una pantalla de recuperación en vez de quedar en blanco.
 */
export class ErrorBoundary extends Component<Props, State> {
    state: State = { huboError: false };

    static getDerivedStateFromError(): State {
        return { huboError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Error no controlado en la aplicación:', error, info.componentStack);
    }

    render() {
        if (this.state.huboError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center text-foreground">
                    <h1 className="text-xl font-semibold">Ocurrió un problema al mostrar esta página</h1>
                    <p className="max-w-md text-sm text-muted-foreground">
                        Puede deberse a una actualización reciente del sistema o a una extensión del navegador (como el traductor). Recarga la
                        página para continuar.
                    </p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                        Recargar página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
