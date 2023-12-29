export default function dataSend(data) {
    const refineData = {
        postBoardRequestDTO: {
            title: data.title,
            content: data.content,
            deadline: data.deadline,
            categoryList, 
        },
        file: data.file,
    };

    return refineData;
};