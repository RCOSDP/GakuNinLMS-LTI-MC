import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type State = {
  title: string;
  videos: string[];
};

const initialState = {
  title: "",
  videos: [],
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<Dispatch<SetStateAction<State>>>(
  () => {}
);

export const useAppState = () => {
  return useContext(StateContext);
};

export const useDispatch = () => {
  return useContext(DispatchContext);
};

export const StateProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useState<State>(initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
