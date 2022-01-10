import { Record } from "../../interfaces/RecordEntities";
import { RecordIndexProps } from "../../hooks/PagesProps";
import { useFetch } from "../../hooks/useFetch";
import { RecordList } from './List';

export const RecordIndex = <T extends Record>({
    ListItem,
    apiPath,
    apiOptions,
}: RecordIndexProps<T>) => {
    const { records } = useFetch<T>(apiPath, apiOptions);

    return(
        <div className="page">
            <div className="content">
                <RecordList<T> ListItem={ListItem} records={records} />
            </div>
        </div>
    )
};