
export interface DimData{
    dimName: string,
    dimId: number,
    tps: number,
    ms: number,
    chunks: number,
    e: number;
    te: number;
    updateTime: number;
}
// export const DimDataAdapter = (j: DimData) => {
//     return <DimData>Object.assign(j, j && {
//     dimName: j.dimName,
//     dimId: j.dimId,
//     tps: j.tps,
//     ms: j.ms,
//     chunks: j.chunks,
//     e: j.e,
//     te: j.te,
//     epoch: j.epoch
// });
// }