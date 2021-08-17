import { useCallback, useEffect, useRef } from 'react';
import { usePsyExamContext } from '../../context/psyexam_context';

const UserRegister = () => {
    const { state, saveName, saveGender } = usePsyExamContext();
    const { name, gender } = state;
    const male = useRef(null);
    const female = useRef(null);

    const handleChangeName = useCallback((e) => {
        const newName = e.target.value;
        // TODO: 이름 예외처리
        if (newName != name) {
            saveName(newName);
        }
    }, [saveName]);

    //TEST
    // useEffect(() => {
        // console.log(name, gender);
    // }, [name, gender]);

    return (
        <form>
            <label htmlFor="user_name">이름
                <input
                    id="user_name"
                    name="user_name"
                    value={name}
                    type="text"
                    onChange={handleChangeName} />
            </label>
            성별
            <label htmlFor="male">남성
                <input
                    ref={male}
                    id="male"
                    name="gender"
                    value="100323"
                    type="radio"
                    onClick={(e) => saveGender(e.target.value)}
                    defaultChecked={gender === male} />
            </label>
            <label htmlFor="female">여성
                <input
                    ref={female}
                    id="female"
                    name="gender"
                    value="100324"
                    type="radio"
                    onClick={(e) => saveGender(e.target.value)}
                    defaultChecked={gender === female} />
            </label>
        </form>
    );
}

// const UserRegisterForm = 

export default UserRegister;