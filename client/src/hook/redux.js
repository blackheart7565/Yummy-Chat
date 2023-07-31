import {useDispatch, useSelector} from "react-redux";

export const useRedux = () => {
    const dispatch = useDispatch();
    const channel = useSelector(state => state.channel);
    const user = useSelector(state => state.user);
    const message = useSelector(state => state.message);

    return {
        dispatch
        , channel
        , user
        , message
    }
}