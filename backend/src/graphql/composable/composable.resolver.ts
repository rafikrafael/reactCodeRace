import { GraphQLFieldResolver } from "graphql";

export type ComposableResolver<TSource, TContext> = 
    (fn: GraphQLFieldResolver<TSource, TContext>) => GraphQLFieldResolver<TSource, TContext>;

export function compose<TSource, TContext>(
    ...funcs: Array<ComposableResolver<TSource, TContext>>
): ComposableResolver<TSource, TContext> {

    if (funcs.length === 0) {
        // if no functions return the identity
        return o => {            
            return o;
        };
    }
    
    if (funcs.length === 1) {
        return funcs[0];
    }
    
    const last = funcs[funcs.length - 1];
    return (f: GraphQLFieldResolver<TSource, TContext>): GraphQLFieldResolver<TSource, TContext> => {
        let result = last(f);
        // aqui nesse laço é feito o seguinte esquema
        // sempre pega o ultimo, adiciona a variável result o anterior recebendo o seu proximo, 
        // exemplo se tem 10 resolvers, pega o 9 e passa por parametro para o resolver 9 o resolver 10
        // na proxima interação pega o resolver 8 e passa o resolver 9 como parametro, ate o primeiro
        // sempre a variável result é trocada e ficando cada resolver apontado para o seu proximo
        for (let index = funcs.length - 2; index >= 0; index--) {
            const fn = funcs[index];
            result = fn(result);
        }
        return result;
    }
}