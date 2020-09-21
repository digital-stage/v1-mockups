// @ts-nocheck
import React, {useCallback, useEffect, useState} from "react";
import cookie from 'js-cookie'
import {AUTH_URL} from "../env";

export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface AuthProps {
    user: AuthUser;
    loading: boolean;
    token: string | null;

    createUserWithEmailAndPassword(email: string, password: string, optional?: {
        name: string;
        avatarUrl?: string;
    });

    signInWithEmailAndPassword(email: string, password: string);

    logout();
}

const AuthContext = React.createContext<AuthProps>({
    user: null,
    loading: true,
    token: null,
    createUserWithEmailAndPassword: () => {
    },
    signInWithEmailAndPassword: () => {
    },
    logout: () => {
    }
});

export const useAuth = (): AuthProps => React.useContext<AuthProps>(AuthContext);

const getUserByToken = (token: string): Promise<AuthUser> => fetch(AUTH_URL + "/profile", {
    headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
    }
}).then(result => result.json()).then(json => json as AuthUser);

export const AuthContextProvider = (props: {
    children: React.ReactNode
}) => {
    const [isCookieRead, setCookieRead] = useState<boolean>(false);
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<AuthUser>();
    const [loading, setLoading] = useState<boolean>(true);

    const createUserWithEmailAndPassword = useCallback((email: string, password: string, additional?: {
        name: string;
        avatarUrl?: string;
    }) => {
        setLoading(true);
        return fetch(AUTH_URL + "/signup", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                name: additional ? additional.name : "",
                avatarUrl: additional ? additional.avatarUrl : "",
            })
        })
            .then(result => result.json())
            .then(result => {
                console.log(result);
                return result;
            })
            .then(result => setToken(result))
            .then(() => setLoading(false));
    }, []);

    const signInWithEmailAndPassword = useCallback((email: string, password: string) => {
        setLoading(true);
        return fetch(AUTH_URL + "/login", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(result => result.json())
            .then(token => setToken(token))
            .then(() => setLoading(false));
    }, []);

    const logout = useCallback(() => {
        cookie.remove('token');
        setToken(undefined);
        setUser(undefined);
    }, []);

    useEffect(() => {
        if (token) {
            cookie.set('token', token, {expires: 1});
            getUserByToken(token).then(user => {
                setUser(user);
                setLoading(false);
            });
        } else if (isCookieRead) {
            setUser(undefined);
            cookie.remove('token');
        }
    }, [token, isCookieRead]);

    useEffect(() => {
        const token = cookie.get('token');
        if (token) {
            setToken(token);
        } else {
            setCookieRead(true);
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            createUserWithEmailAndPassword: createUserWithEmailAndPassword,
            signInWithEmailAndPassword: signInWithEmailAndPassword,
            logout: logout,
            user: user,
            loading: loading,
            token: token
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const withAuth = (ComposedComponent: any) => {
    const DecoratedComponent = (props: any) => {
        return (
            <AuthContext.Consumer>
                {(auth: AuthProps) => (
                    <ComposedComponent user={auth.user} loading={auth.loading} token={auth.token} {...props} />
                )}
            </AuthContext.Consumer>
        );
    };
    return DecoratedComponent;
};
