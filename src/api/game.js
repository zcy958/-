import http from '../http'

const game = {
    getGame(queryString,status,currentPage,pageSize){
        return http.post(`/api/game/list`,null,{
            currentPage,
            pageSize,
            queryString,
            status
        })
    },
    addGame(gameData,typeIds){
        return http.post(`/api/game/add`,null,{
            gameName:gameData.gameName,
            gameNameEn:gameData.gameNameEn,
            gamePlatform:gameData.gamePlatform,
            gameLanguage:gameData.gameLanguage,
            introduce:gameData.introduce,
            productionName:gameData.productionName,
            issuingName:gameData.issuingName,
            releaseDate:gameData.releaseDate,
            hot:gameData.hot,
            status:gameData.status,
            createBy:gameData.createBy,
            typeIds
        })
    },
    editGame(gameData,typeIds){
        return http.put(`/api/game/edit`,null,{
            gameId:gameData.gameId,
            gameName:gameData.gameName,
            gameNameEn:gameData.gameNameEn,
            gamePlatform:gameData.gamePlatform,
            gameLanguage:gameData.gameLanguage,
            introduce:gameData.introduce,
            productionName:gameData.productionName,
            issuingName:gameData.issuingName,
            releaseDate:gameData.releaseDate,
            hot:gameData.hot,
            status:gameData.status,
            createBy:gameData.createBy,
            typeIds
        })
    },
    delGame(gameId){
        return http.delete(`/api/game/${gameId}`)
    },
    getGameType(gameId){
        return http.get(`/api/game/gameType/${gameId}`)
    },
    getAllType(){
        return http.get(`/api/game/type/all`)
    },
    getType(queryString,status,currentPage,pageSize){
        return http.post(`/api/game/type/list`,null,{
            currentPage,
            pageSize,
            queryString,
            status
        })
    },
    addType(type){
        return http.post(`/api/game/type/add`,null,{
            typeName:type.typeName,
            typeNameEn:type.typeNameEn,
            status:type.status,
            createBy:type.createBy,
        })
    },
    editType(type){
        return http.put(`/api/game/type/edit`,null,{
            typeId:type.typeId,
            typeName:type.typeName,
            typeNameEn:type.typeNameEn,
            status:type.status,
            updateBy:type.updateBy,
        })
    },
    delType(typeId){
        return http.delete(`/api/game/type/${typeId}`)
    }
}
export default game