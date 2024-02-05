// 날짜
const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}

// 신고 접수
export const registerReportResponseDTO = (data) => {
    return {
        "reportId": data[0].reportId, 
        "reportStatus": data[0].reportStatus, 
        "reportERId": data[0].reportERId, 
        "reportEEId": data[0].reportEEId, 
        "reportContext": data[0].reportContext, 
        "cursorId": data[data.length-1].reportId
    };
}

// 신고 내역 조회
export const getReportDetailsResponseDTO = (data, context) => {
    const reports = [];

    for (let i = 0; i < category.length; i++) {
        reports.push({
            'reportId': context[i].reportId,
            'status': context[i].reportStatus,
            'reportEEId': context[i].reportEEId,
            'createdAt': context[i].createdAt,
        })
    }

    return {
        "listData": reports, 
        "cursorId": data[data.length-1].reportId
    };
}