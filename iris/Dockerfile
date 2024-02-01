ARG IMAGE=containers.intersystems.com/intersystems/irishealth-community:latest-cd
FROM $IMAGE

USER root

WORKDIR /opt/irisapp
RUN chown -R irisowner:irisowner /opt/irisapp

USER irisowner

# copy files to image
WORKDIR /opt/irisapp

COPY --chown=$ISC_PACKAGE_MGRUSER:$ISC_PACKAGE_IRISGROUP /iris/certificates /certificates
RUN chmod +x /certificates
 
COPY --chown=$ISC_PACKAGE_MGRUSER:$ISC_PACKAGE_IRISGROUP /iris/irissession.sh /
RUN chmod +x /irissession.sh

COPY --chown=$ISC_PACKAGE_MGRUSER:$ISC_PACKAGE_IRISGROUP /iris/DemoSetup.Utilities.cls . 
RUN chmod +x /opt/irisapp/DemoSetup.Utilities.cls

SHELL ["/irissession.sh"]

RUN \
zn "%SYS" \
do ##class(SYS.Container).QuiesceForBundling() \
do ##class(Security.Users).UnExpireUserPasswords("*") \
zn "USER" \
set sc=##class(%SYSTEM.OBJ).Load("/opt/irisapp/DemoSetup.Utilities.cls","ck") \
set helper=##class(DemoSetup.Utilities).%New() \ 
do helper.EnableSSLSuperServer()

RUN \
zn "HSLIB" \
Set appKey = "/smart/fhir/r5" \
Set strategyClass = "HS.FHIRServer.Storage.Json.InteractionsStrategy" \
Set metadataConfigKey = $lb("hl7.fhir.r5.core@5.0.0") \
Do ##class(HS.Util.Installer.Foundation).Install("FHIR") \
zn "FHIR" \
Do ##class(HS.FHIRServer.Installer).InstallNamespace() \
Do ##class(HS.FHIRServer.Installer).InstallInstance(appKey, strategyClass, metadataConfigKey)