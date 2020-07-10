import base from '../base';

class Api extends base {
    async getParameterInfo(data) {
        let parameterValue = '';
        switch (data.paramCode) {
            case "Subject":
                parameterValue = '学科';
                break;
            case "Phase":
                parameterValue = '学段';
                break;
            case "Version":
                parameterValue = '版本';
                break;
            case 'Term':
                parameterValue = '学期';
                break;
            case "Area":
                parameterValue = '地区';
                break;
            case "Grade":
                parameterValue = '年级';
                break;

            case "Knowledge":
                return [
                    {
                        "knowledgeId": 1,
                        "knowledgeUuid": "a5e1cceb-40f5-46a7-bab4-b9c2df6001ab",
                        "parentId": 0,
                        "name": "世界地理概况",
                        "remark": null,
                        child: [
                            {
                                "knowledgeId": 3,
                                "knowledgeUuid": "a5e1cceb-40f5-46a7-bab4-b9c2df6001ab",
                                "parentId": 0,
                                "name": "世界地理概况2",
                                "remark": null,
                            }
                        ]
                    },
                    {
                        "knowledgeId": 2,
                        "knowledgeUuid": "87c180c2-c5f4-4c62-978a-4455c38e206b",
                        "parentId": 1,
                        "name": "人口",
                        "remark": null
                    },
                ]

        }

        return [
            {
                "parameterId": 1,
                "parameterName": "",
                "parameterValue": `${parameterValue}1`,
                "parameterCode": data.paramCode,
                "parameterStatus": 1
            },
            {
                "parameterId": 2,
                "parameterName": "",
                "parameterValue": `${parameterValue}2`,
                "parameterCode": data.paramCode,
                "parameterStatus": 1
            }
        ]
    }
}

export default new Api();