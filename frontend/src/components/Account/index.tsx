import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAccountById } from "../../store/accounts";


type accountProps = {
    id: number,
    account: string,
    balance: number
}

const Account = ({ id, account, balance }: accountProps) => {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [initialBalance, setInitialBalance] = useState(balance);
    const [accountName, setAccountName] = useState(`${account}`);

    const handleEdit = () => {
        if (clicked == true) {
            dispatch(updateAccountById(id, initialBalance ?? 0, accountName))
            setClicked(false)
        } else {
            setClicked(true)
        }
    }

    if (clicked === false) {
        return (
            <div>
                <div>
                    <h2>{accountName}</h2>
                    <p>$ {initialBalance}</p>
                </div>
                <button onClick={() => handleEdit()}>edit</button>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <input
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                    ></input>
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
