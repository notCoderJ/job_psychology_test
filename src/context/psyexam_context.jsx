import { useContext, createContext } from "react";
import { usePsyExamState } from "../reducer/psyexam_reducer";


const PsyExamContext = createContext(null);

export const usePsyExamContext = () => {
    const context = useContext(PsyExamContext);
    if (!context) {
        throw new Error("Use ExamContext inside Provider.");
    }

    return context;
};

const PsyExamProvider = ({ children }) => {
    const values = usePsyExamState();

    return <PsyExamContext.Provider value={values}>{ children }</PsyExamContext.Provider>;
}

export default PsyExamProvider;