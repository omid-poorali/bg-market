import React, { useEffect } from 'react';
import * as Models from 'models';

export type Store = {
    darkMode: boolean;
    coins: [string, Models.Coin][];
};

type AppContext = Store & {
    setDarkMode: (darkMode: boolean) => void;
};

const appContext = React.createContext<AppContext>({} as AppContext);

type PropsType = {
    children: React.ReactNode;
};

export function StoreProvider({ children }: PropsType) {

    const savedDarkMode = localStorage.getItem("darkMode");
    const [state, setState] = React.useState<Store>({
        darkMode: savedDarkMode ? localStorage.getItem("darkMode") === "true" : true,
        coins: [],
    });

    const setDarkMode: AppContext["setDarkMode"] = (darkMode) => setState(prevState => ({ ...prevState, darkMode }));

    useEffect(() => {

        const setCoins = (coins: Store["coins"]) => setState(prevState => ({ ...prevState, coins }));

        const socket = new WebSocket(import.meta.env.VITE_WS ?? "")

        socket.onmessage = (event) => {

            const json = JSON.parse(event.data);
            try {
                if ((json.event == 'price')) {
                    const parsedData: Store["coins"] = Object.entries(json.data);
                    const sorted = parsedData.sort(([, coinA], [, coinB]) => (Number(coinB.quoteVolume) - Number(coinA.quoteVolume)));
                    setCoins(sorted); 
                }
            } catch (err) {
                console.log(err);
            }

        }
        return () => socket.close();
    }, [setState]);

    return (
        <appContext.Provider value={{
            ...state, setDarkMode
        }}>
            {children}
        </appContext.Provider>
    );
}

/**
 * A react hook that enables you to have access to app context.
 * @returns Object that contains user's app information and methods to change them.
 */
export const useStore = () => {
    const context = React.useContext(appContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
