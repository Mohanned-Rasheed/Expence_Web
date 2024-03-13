import LOGOUTsvg from "../assets/logout-svgrepo-com.svg";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../state/Firebase/userSlice";
import { logout } from "../state/Transaction/TransactionSlice";
interface Props {}

function Header(props: Props) {
  const {} = props;
  const dispatch = useDispatch();
  return (
    <div className="sticky bg-white min-h-[10vh] border-b-2 border-black">
      <section className=" flex items-center justify-between min-h-[10vh]">
        <div className="pl-8 font-medium text-xl">Expences</div>
        <section className="flex gap-12 pr-[2vw]">
          <div className="select-none max-md:text-sm ">
            Hi {auth.currentUser?.email}
          </div>
          <img
            className="hover:opacity-60 cursor-pointer"
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                auth.signOut();
                dispatch(setUser(null));
                dispatch(logout());
              }
            }}
            height={20}
            width={20}
            src={LOGOUTsvg}
          />
        </section>
      </section>
    </div>
  );
}

export default Header;
