import { useCallback, useEffect } from 'react';
// import { useForm } from 'react-hook-form'; // test
import { connect } from 'react-redux';
import actionCreators from '../../actions';
import { GENDER_STR } from '../../utils/constants/constants';


const UserRegister = ({ idx, userName, gender, saveName, saveGender }) => {
    // const { register, handleSubmit, errors, watch} = useForm();

    const handleChangeName = useCallback((e) => {
        // TODO: 이름 예외처리
        if (userName !== e.target.value) {
            saveName(e.target.value);
        }
    }, [userName, saveName]); // TODO: useCallback 동작 매커니즘 알아보기!!

    //TEST
    // useEffect(() => {
    //     console.log(userName, gender);
    // }, [userName, gender]);

    return (
        <form>
            <label htmlFor="user_name">이름
                <input
                    id="user_name"
                    // name="user_name"
                    defaultValue={userName}
                    // {...register("user_name")}
                    type="text"
                    onChange={handleChangeName} />
            </label>
            성별
            <label htmlFor="male">남성
                <input
                    id="male"
                    name="gender"
                    value="100323"
                    type="radio"
                    onClick={(e) => saveGender(e.target.value)}
                    defaultChecked={GENDER_STR[gender] === "남성"} />
            </label>
            <label htmlFor="female">여성
                <input
                    id="female"
                    name="gender"
                    value="100324"
                    type="radio"
                    onClick={(e) => saveGender(e.target.value)}
                    defaultChecked={GENDER_STR[gender] === "여성"} />
            </label>
        </form>
    );
}

// const UserRegisterForm = 

const mapStatToProps = (state) => {
    const { name: userName, gender } = state;
    return { userName, gender }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveName: (name) => dispatch(actionCreators.saveName(name)),
        saveGender: (gender) => dispatch(actionCreators.saveGender(gender)),
    };
}

export default connect(mapStatToProps, mapDispatchToProps)(UserRegister);