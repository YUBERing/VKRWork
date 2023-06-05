const Router = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const router = new Router();


router.get('/file-creator', (req, res) => {
    try {
        const data = JSON.parse(req.query.data);

        try {
            const templateFile = fs.readFileSync(path.resolve(__dirname, './files/template.docx'), 'binary');
            const zip = new PizZip(templateFile);

            let outputDocument = new Docxtemplater(zip);

            const developerList = data.currentDevelopers.map(item => {
                return {developer: item}
            })

            const ordersList = data.currentOrders.map(item => {
                return {order: item}
            })

            const knowList = data.currentPlannedOutcomes.know.map(item => {
                return {know: item}
            })

            const beAbleList = data.currentPlannedOutcomes.be_able.map(item => {
                return {be_able: item}
            })

            const ownList = data.currentPlannedOutcomes.own.map(item => {
                return {own: item}
            })

            const masterList = data.currentPlannedOutcomes.master.map(item => {
                return {label: item.label, value: item.value}
            })

            const showBased = data.currentPlaceDiscipline.based.length !== 0;

            const showBasis = data.currentPlaceDiscipline.basis.length !== 0;

            const baseList = data.currentPlaceDiscipline.based.map(item => {
                return {
                    base: item
                }
            })

            const basisList = data.currentPlaceDiscipline.basis.map(item => {
                return {
                    basis: item
                }
            })

            const thematicPlanList = data.currentThematicPlan.map((item, index) => {
                return {
                    id: index + 1,
                    name: item.name,
                    total: item.total,
                    lectures: item.lectures,
                    laboratory: item.laboratory,
                    independetWork: item.independentWork
                }
            })

            const chapterPlanList = data.currentChapterPlan.map((item, index) => {
                const chapterContentPlanList = data.currentChapterContentPlan.filter(item => item.chapter === index).map(item => {
                    return {
                        name: item.name,
                        description: item.description,
                    }
                })

                return {
                    id: index + 1,
                    name: item,
                    chapterContentPlanList: chapterContentPlanList,
                }
            })

            const practicalTrainingList = data.currentPracticalTraining.map(item => {
                return {
                    codeCompetence: item.codeCompetence,
                    indicatorCompetence: item.indicatorCompetence,
                    taskContent: item.taskContent,
                    total: item.total,
                    lectures: item.lectures,
                    courseProject: item.courseProject,
                    laboratory: item.laboratory,
                }
            })

            const independentWorkList = data.currentIndependentWork.map((item, index) => {
                return {
                    id: index + 1,
                    section: item.section,
                    task: item.task,
                    hours: item.hours,
                    recommendation: item.recommendation,
                    control: item.control,
                }
            })

            const laboratoryClassesList = data.currentLaboratoryClasses.map((item, index) => {
                return {
                    id: index + 1,
                    content: item,
                }
            })

            const referencesMainList = data.currentReferencesMain.map((item, index) => {
                return {
                    id: index + 1,
                    content: item,
                }
            })

            const showAdditionalList = data.currentReferencesAdditional.length !== 0;

            const additionalList = data.currentReferencesAdditional.map((item, index) => {
                return {
                    id: index + 1,
                    content: item,
                }
            })

            const informationList = data.currentInformation.map((item, index) => {
                return {
                    id: index + 1,
                    content: item,
                }
            })

            const electronicLibrariesList = data.currentElectronicLibraries.map((item, index) => {
                return {
                    id: index + 1,
                    content: item,
                }
            })

            const classroomList = data.currentClassroom.map((item, index) => {
                return {
                    id: index + 1,
                    specialAudit: item.specialAudit,
                    numberAudit: item.numberAudit,
                }
            })

            const showAnotherClassroom = data.currentAnotherClassroom.length !== 0;

            const electronicEquipmentList = data.currentElectronicEquipments.map((item, index) => {
                return {
                    id: index + 1,
                    content: item,
                }
            })

            const dataToAdd = {
                discipline: data.currentDiscipline,
                direction: data.currentDirection,
                profile: data.currentProfile,
                qualification: data.currentQualification,
                order_number: data.currentOrderNumber,
                developerList: developerList,
                reviewer: data.currentReviewer,
                directionChange: data.currentDirection,
                affiramtive: data.currentAffirmative,
                goal: data.currentGoal,
                ordersList: ordersList,
                knowList: knowList,
                be_ableList: beAbleList,
                ownList: ownList,
                masterList: masterList,
                semesters: data.currentSemesters,
                showBased: showBased,
                showBasis: showBasis,
                baseList: baseList,
                basisList: basisList,
                total_credits: data.currentScopeDiscipline.totalCredits,
                total_hours: data.currentScopeDiscipline.totalHours,
                classroom_classes: data.currentScopeDiscipline.classroomClasses,
                lection: data.currentScopeDiscipline.lectures,
                laboratory: data.currentScopeDiscipline.laboratory,
                practical: data.currentScopeDiscipline.practical,
                independet: data.currentScopeDiscipline.independent,
                form_certification: data.currentScopeDiscipline.formCertification,
                lection: data.currentScopeContactWork.lectures,
                laboratory: data.currentScopeContactWork.laboratory,
                consultation: data.currentScopeContactWork.consultation,
                test: data.currentScopeContactWork.test,
                exam: data.currentScopeContactWork.exam,
                course: data.currentScopeContactWork.course,
                all: data.currentScopeContactWork.all,
                thematicPlanList: thematicPlanList,
                total_total: data.currentThematicPlanTotal.total,
                total_lectures: data.currentThematicPlanTotal.lectures,
                total_laboratory: data.currentThematicPlanTotal.laboratory,
                total_independentWork: data.currentThematicPlanTotal.independentWork,
                chapterPlanList: chapterPlanList,
                practicalTrainingList: practicalTrainingList,
                independentWorkList: independentWorkList,
                laboratoryClassesList: laboratoryClassesList,
                referencesMainList: referencesMainList,
                showAdditionalList: showAdditionalList,
                additionalList: additionalList,
                informationList: informationList,
                electronicLibrariesList: electronicLibrariesList,
                classroomList: classroomList,
                showAnotherClassroom: showAnotherClassroom,
                anotherClassroom: data.currentAnotherClassroom,
                equipment: data.currentEquipment,
                electronicEquipmentList: electronicEquipmentList,
                typeElectronicEquipment: data.currentTypeElectronicEquipment,
            };

            outputDocument.setData(dataToAdd);

            try {
                outputDocument.render()

                let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });

                fs.writeFileSync(path.resolve(__dirname, './files/OUTPUT.docx'), outputDocumentBuffer);

                return res.download('./router/files/OUTPUT.docx')
            }
            catch (error) {
                console.error(error)
                res.send({message: `ERROR Filling out Template`});
            }
        } catch(error) {
            console.error(error);
            res.send({message: `ERROR Loading Template`});
        }
    }
    catch (e) {
        console.log(e)
        res.send({message: 'Server error'})
    }
})

module.exports = router;