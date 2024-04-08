import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, PDFDownloadLink, Link } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import certificateStyle from './styles/certificate.module.css'
import headerImage from "../../../../assets/icons/WTS-Icons_WTS-Horizontal.png";
import treeImage from "../../../../assets/icons/WTS-Icons_TreeOfKnowledge.png"
import heebo600 from "../../../../assets/fonts/Heebo/Heebo-Medium.ttf";
import heebo800 from "../../../../assets/fonts/Heebo/Heebo-ExtraBold.ttf";
import heeboRegular from "../../../../assets/fonts/Heebo/Heebo-Regular.ttf";
import GenericCard from '../../../ui/GenericCard';
import { links, legalSlugs } from '../../../../links';

Font.register(
    {
        family: "Heebo", 
        fonts: [
            {
                src: heeboRegular,
            },
            {
                src: heebo600,
                fontWeight: 600
            },
            {
                src: heebo800,
                fontWeight: 800
            },
        ]
    })

const styles = StyleSheet.create({
    page: {
        paddingTop: "1in",
        paddingBottom: "1in",
        paddingHorizontal: "1in",
        fontFamily: "Heebo",
        fontSize: "12pt",
    },
    headerBorder: {
        width: "100vw",
        height: "5%",
        backgroundColor: "#bed4ca",
        position: "absolute",
        top: 0,
        left: 0,
    },
    headerImage: {
        width: "40%",
    },
    treeImage: {
        width: "10%",
        position: "absolute",
        top: "1in",
        right: "1in",
    },
    certificateCode: {
        position: "absolute",
        bottom: "1in",
        right: "1in",
        fontSize: "8pt"
    },
    title: {
        fontSize: "36pt",
        fontWeight: "800",
        letterSpacing: -1,
    },
    name: {
        fontSize: "24pt",
        fontWeight: "800",
        letterSpacing: -1,
    },
    bold: {
        fontWeight: "600",
    },
    link: {
        color: "black"
    },
    border: {
        width: "100%",
        height: "5%",
        backgroundColor: "#bed4ca",
    },
    section: {
        marginBottom: "100pt",
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e7e5e4',
        marginBottom: '10pt',
        padding: "5pt",
    },
    disclaimer: {
        fontSize: "7pt"
    }
})

const CertificateModal = ({treeState, track}) => {

    let name = `${treeState["certificate-name"]}`
    
    let title = "Congratulations!"
    let text = <>
        <div className={certificateStyle['section']}>You've mastered a track! As a reward for your hard effort, we're awarding you this certificate!</div>
        <div className={certificateStyle['section']}>
            Right click on PDF and select "Save As" to download track certificate <PDFDownloadLink document={<Certificate name={name} track={track}/>} fileName={`WeTheStudy-TrackCertificate.pdf`}>
                {({ blob, url, loading, error }) =>
                    loading ? '. Loading document...' : 'or click here to download!'
                }
            </PDFDownloadLink>
        </div>
        <div className={certificateStyle['section']}>By downloading this certificate, you agree to its <a href={`${links["resourcesLink"]}/${legalSlugs[0]}`}>terms</a>.</div>
        <div className={certificateStyle["close-button"]} id="cert-close-button">CLOSE</div>  
    </>

    let title2 = `You're still at ${Math.round(track.fields['Progress']*100)/100}%`
    let text2 = <>
        <div>Master all <span className={certificateStyle["bold"]}>{`${track.fields["Nodes"].length}`}</span> encircled nodes to get the <span className={certificateStyle["bold"]}>{`${track.fields["Name"]}`}</span> track certificate.</div>
        <br/>
        <div className={certificateStyle["close-button"]} id="cert-close-button-2">CLOSE</div>  
    </>

    return <div className={certificateStyle['certificate-wrapper']} id="certificate-wrapper">
        <div className={certificateStyle['certificate-main-wrapper']}> 
        {track.fields["Progress"] >= 100 ? 
        <>
            <GenericCard title={title} text={text}/>
            <PDFViewer width="65%" height="100%" showToolbar={false} className={certificateStyle['iframe-scale']}>
                <Certificate name={name} track={track}/>
            </PDFViewer>
        </>
             : 
            <GenericCard title={title2} text={text2}/>
        }
        </div> 
        
    </div>
    
}

//Improve Security of Certificate
const Certificate = ({name, track}) => {
    function convertToTitleCase(str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
      }
    
     function formatDate(value) {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + ' ' + month + ' ' + year;
    }

    return <Document
        title="WeTheStudy - Track Certificate of Completion"
        subject={`${track.fields["Name"]}`}
        author="WeTheStudy"
        creator="WeTheStudy"
        pageLayout='oneColumn'
    >
        <Page 
            style={styles.page}
        >
            <View style={styles.headerBorder}></View>
            <Image src={headerImage} style={styles.headerImage}/>
            <Image src={treeImage} style={styles.treeImage}/>
            <View style={styles.section}></View>
            <View>
                <Text style={styles.title}>Certificate of Completion</Text>
                <View style={styles.border}></View>
            </View>
            <View style={styles.section}>
                <Text>This certificate is awarded to</Text>
                <Text style={styles.name}>{convertToTitleCase(name)}</Text>
                <Text>as proof he has mastered the track course for</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.fieldWrapper}>
                    <Text style={styles.bold}>Track</Text>
                    <Text>{track.fields["Name"]}</Text>
                </View>
                <View style={styles.fieldWrapper}>
                    <Text style={styles.bold}>Edition</Text>
                    <Text>{track.fields["Version"]}</Text>
                </View>
                <View style={styles.fieldWrapper}>
                    <Text style={styles.bold}>Mastered Nodes</Text>
                    <Text>{track.fields["Nodes"].length}</Text>
                </View>
                <View style={[styles.fieldWrapper, {flexDirection: 'column'}]}>
                    <Text style={styles.bold}>Track Description</Text>
                    <Text>{track.fields["Description"]}</Text>
                </View>
                <Text>This certificate is given on <Text style={[styles.bold]}>{formatDate(getDate())}</Text></Text>
            </View>
            <Text style={styles.disclaimer}>This Certificate is a property of WeTheStudy and is intended solely for the Recipient. 
            Any unauthorized reproduction, alteration, or distribution is strictly prohibited. A third-party may request WeTheStudy 
            for verification of this certificate through our <Link style={[styles.link]} href={`${links["contactLink"]}`}>contact form.</Link></Text>
        </Page>
    </Document>
}

export {CertificateModal}