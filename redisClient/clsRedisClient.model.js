const redisClient = require("redis").createClient();

const connect = (async () => await redisClient.connect())();
const globalArr = require("../../global/globalData");

module.exports = class clsRedis {
  async pushInRedis() {
    try {

      let allArrays = [
        "arrUserRights",
        "arrUsers",

        //calibration
        "arrCalibCounter",
        "arrOfBalListWithPortNumber",
        "calibrationStatus",
        "arrcalibType",
        "arrBalanceRecalibStatus",
        "glbArrListOfBalWithCalibPending",
        "glbArrListOfCalibratedBal",
        "arrBalance",
        "arrBalCalibWeights",
        "arrCalibCounterApi",
        "arrSelectedBalWithHmi",
        "monitDetail",

        "arrsendWt",
        "glbArrOfDecimal",
        "arrCalibInsertCounter",
        "arrBalCaibDet",
        "arrsetAllParameters",
        "arrDaqSrNoInfo",
        "arrCalibrationSequnce",
        "arrSortedCalib",
        "arr_IPQCRelIds",
        "arrIdsInfo",
        "arrProductTypeArray",
        "weighmentstatus",
        "ForceRemainderSkip",

        "arr_Perform_Reminder_CalibDueDt",
        "arrDataFromInstHardness",
        "arrHardness425",
        "arrTapDensity",
        "arrPreWeighCalibOwner",
        "arrOutFlagForTest",
        "arrMQTTUnsendMsg",
        "monitDetail",
        "weighmentstatus",

        //weightment,
        "arr_limits",
        "arrSelectedMenu",
        "arrside",
        "DoubSide",
        "arrCurrentOperationStatus",
        "arrWeighmentProductData",
        "arrWeighmentCounter",
        "arrWeighmentCounterForFriab",
        "arrSampleRemarkForAllTest",
        "arrWeighmentCounterAfter",
        "arrTimeForMenuDisable",
        "arrConfigSettings",
        "arrDifferentialCounter",
        "arrLODTypeSelectedMenu",
        "arrProtocolData",
        "FrabilityOnBal",
        "arrBFBO",
        "arrFriGetRpmCout",
        "arrBinInfo",
        "arrTotalBins",
        "arrAreaRelated",
        "glbArrCubArea",
        "arrside",
        "DoubSide",
        "DoubSideForFriab",
        "HardnessMasterEntry",
        "arrCommonUsage",

        "arrBalance",
        "arrBalCalibWeights",   

        //weight
        
        "arrHardnessMT50",
        "arrBalanceRecalibStatusIPC",
        
        "linearityReverseCounter",
        "arrPushValuesOfHardness",
        "arrsampleno",
        "formatching",
        "arrcheckingInCompRepSerNo",

        "arrMonitCubic",
        "arrCalibApiHit",
        "arrNos",
        "bulkFlag",

        
      ];
      //await this.flushFromRedis(allArrays, Hmi)
      await redisClient.FLUSHALL()
      allArrays.forEach(async (singleArr) => Object.values(await redisClient.hSet(singleArr, 'DUMMY', JSON.stringify(globalArr[singleArr])))
      );
      //await redisClient.hSet(arrName, Hmi, JSON.stringify(data));
      // console.log('start');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchDataFromRedis() {
    try {

      let allArrays = [
        "arrUserRights",
        "arrUsers",

        //calibration
        "arrCalibCounter",
        "arrOfBalListWithPortNumber",
        "calibrationStatus",
        "arrcalibType",
        "arrBalanceRecalibStatus",
        "glbArrListOfBalWithCalibPending",
        "glbArrListOfCalibratedBal",
        "arrBalance",
        "arrBalCalibWeights",
        "arrCalibCounterApi",
        "arrSelectedBalWithHmi",
        "monitDetail",

        "arrsendWt",
        "glbArrOfDecimal",
        "arrCalibInsertCounter",
        "arrBalCaibDet",
        "arrsetAllParameters",
        "arrDaqSrNoInfo",
        "arrCalibrationSequnce",
        "arrSortedCalib",
        "arr_IPQCRelIds",
        "arrIdsInfo",
        "arrProductTypeArray",
        "weighmentstatus",
        "ForceRemainderSkip",

        "arr_Perform_Reminder_CalibDueDt",
        "arrDataFromInstHardness",
        "arrHardness425",
        "arrTapDensity",
        "arrPreWeighCalibOwner",
        "arrOutFlagForTest",
        "arrMQTTUnsendMsg",
        "monitDetail",

        //weightment,
        "arr_limits",
        "arrSelectedMenu",
        "arrside",
        "DoubSide",
        "arrCurrentOperationStatus",
        "arrWeighmentProductData",
        "arrWeighmentCounter",
        "arrWeighmentCounterForFriab",
        "arrSampleRemarkForAllTest",
        "arrWeighmentCounterAfter",
        "arrTimeForMenuDisable",
        "arrConfigSettings",
        "arrDifferentialCounter",
        "arrLODTypeSelectedMenu",
        "arrProtocolData",
        "FrabilityOnBal",
        "arrBFBO",
        "arrFriGetRpmCout",
        "arrBinInfo",
        "arrTotalBins",
        "arrAreaRelated",
        "glbArrCubArea",
        "arrside",
        "DoubSide",
        "DoubSideForFriab",
        "HardnessMasterEntry",
        "arrCommonUsage",

        "glbArrListOfCalibratedBal",
        "arrBalance",
        "arrBalCalibWeights",   

        //weight
        
        "arrHardnessMT50",
        "arrBalanceRecalibStatusIPC",
        
        "linearityReverseCounter",
        "arrPushValuesOfHardness",
        "arrsampleno",
        "formatching",
        "arrcheckingInCompRepSerNo",

        "arrMonitCubic",
        "arrCalibApiHit",
        "arrNos",
        "bulkFlag",

        // "arrUsers",
        // "arrUserRights",
        // //getcalibrationfor bal
        // "arrIdsInfo",
        // "glbArrListOfBalWithCalibPending",
        // "arrPreWeighCalibOwner",
        // "glbArrListOfCalibratedBal",
        // "arrCommonUsage",
        // "arrsendWt",
        // "arrBalCalibWeights",
        // "arrCalibCounterApi",
        // "arrCalibCounter",
        // "arrBalanceRecalibStatus",
        // "arrConfigSettings",
        // "arrOfBalListWithPortNumber",
        // "arrcalibType",
        // "arrBalCaibDet",
        // "calibrationStatus",
        // "arrBalance",
        // "arrSelectedBalWithHmi",
        // "ForceRemainderSkip",
        // "arrsetAllParameters",
        // "arrCalibrationSequnce",
        // "arrSortedCalib",
        // "arrOutFlagForTest",
        // "HardnessMasterEntry",
        // "DoubSide",
        // "arrside",
        // "arrWeighmentCounterAfter",
        // "arrDifferentialCounter",
        // "arrProtocolData",
        // "arrWeighmentCounterForFriab",
        // "weighmentstatus",
        // "formatching",
        // "arr_IPQCRelIds",
        // "glbArrOfDecimal",
        // "arrSelectedMenu",
        // "arrWeighmentProductData",
      ];

      allArrays.forEach(async (singleArr) =>
        Object.keys(await redisClient.hGetAll(singleArr, 0, -1)).length != 0
          ? Object.values(await redisClient.hGetAll(singleArr, 0, -1)).map(
            (arr) => globalArr[singleArr] = (JSON.parse(arr))
          )
          : ""
      );

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async flushFromRedis(arrays, Hmi) {
    try {
      arrays.forEach(
        async (singleArr) => await redisClient.hDel(singleArr, Hmi, 0, 1)
      );
    } catch (error) {
      console.log(error);
    }
  }
};
