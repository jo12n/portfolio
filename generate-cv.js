const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCV() {
    console.log('🚀 Starting CV PDF generation...');

    // Path to the index.html file
    const htmlPath = path.join(__dirname, 'index.html');
    const outputPath = path.join(__dirname, 'files', 'cv', 'CV_Ignacio_Jolin_Rodrigo.pdf');

    // Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Launch browser
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set viewport size
        await page.setViewport({ width: 1200, height: 800 });

        // Navigate to the local HTML file
        await page.goto(`file://${htmlPath}`, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait for content to load
        await page.waitForSelector('.sidebar', { timeout: 10000 });

        // Hide hero section and navbar for PDF
        await page.evaluate(() => {
            const hero = document.getElementById('hero');
            const navbar = document.querySelector('.navbar');
            if (hero) hero.style.display = 'none';
            if (navbar) navbar.style.display = 'none';

            // Show QR code
            const qr = document.getElementById('cv-qrcode');
            if (qr) qr.style.display = 'block';
        });

        // Wait a bit for QR image to load
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate PDF
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            }
        });

        console.log(`✅ CV PDF generated successfully!`);
        console.log(`📁 Saved to: ${outputPath}`);

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

// Run the script
generateCV();
