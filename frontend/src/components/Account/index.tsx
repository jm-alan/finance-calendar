import { useState } from "react";
import { useDispatch }from "react-redux";


type accountProps = {
    account: string,
    balance: number
}

const Account = ({ account, balance }: accountProps) => {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [initialBalance, setInitialBalance] = useState(balance);

    const handleEdit = () => {
        if (clicked == true) {
            
            setClicked(false)
        } else {
            setClicked(true)
        }
    }

    if (clicked === false) {
        return (
            <div>
                <div>
                    <h2>{account}</h2>
                    <p>$ {initialBalance}</p>
                </div>
                <button onClick={() => handleEdit()}>edit</button>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <h2>{account}</h2>
                    <input
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(+e.target.value)}
                    ></input>
                </div>
                <button onClick={() => handleEdit()}>save</button>
            </div>
        )
    }


}

export default Account
