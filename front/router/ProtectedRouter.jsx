import { useContext } from 'react';
import { loginContext } from '../src/App';
import { Navigate, Outlet } from 'react-router';
import Cookies from 'js-cookie';

//ログインしていない場合は、強制的にログイン画面に遷移させる
const ProtectedRouter = () => {
    console.log('ProtectedRouterです。');
    // console.log(document.cookie);
    console.log(Cookies.get());
    const cookie = document.cookie;
    
    
    const { isLogin } = useContext(loginContext);
    console.log(isLogin);
    
    if (!isLogin) {
        return <Navigate to="/" replace/>;
    }
//次のやつを実行させる
  return <Outlet />;
};

export default ProtectedRouter;
