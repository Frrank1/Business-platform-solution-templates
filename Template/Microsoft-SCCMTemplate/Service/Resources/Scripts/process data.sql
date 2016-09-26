SET NOCOUNT ON;

EXEC pbist_sccm.sp_populatecomputer;
EXEC pbist_sccm.sp_populatecomputermalware;
EXEC pbist_sccm.sp_populatecomputerprogram;
EXEC pbist_sccm.sp_populatecomputerupdate;
EXEC pbist_sccm.sp_populatemalware;
EXEC pbist_sccm.sp_populateprogram;
EXEC pbist_sccm.sp_populatescanhistory;
EXEC pbist_sccm.sp_populatesite;
EXEC pbist_sccm.sp_populateupdate;
EXEC pbist_sccm.sp_populateuser;
EXEC pbist_sccm.sp_populateusercomputer;
EXEC pbist_sccm.sp_populatecollection;
EXEC pbist_sccm.sp_populatecomputercollection;
