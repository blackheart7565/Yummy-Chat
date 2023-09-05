import {useDispatch, useSelector} from "react-redux";

// useStateRedux
export const useRedux = () => {
    const dispatch = useDispatch();
    const channel = useSelector(state => state.channel);
    const user = useSelector(state => state.user);
    const message = useSelector(state => state.message);

    /**
     * @param {Object} values обьект аргументов
     * */
    const setDispatch = (values) => {
        dispatch(
            {...values}
        );
    }

    return {
        dispatch
        , channel
        , user
        , message
        , setDispatch
    }
}