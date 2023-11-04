import * as d3 from "d3";
import {links} from '../../links.js';
import { parameters } from "../../database/parameters.js";

export const treeUtilities = {
  treeProperties: parameters.treeProperties,
  processJSON: (data) => {
    let records = [];
    data.forEach(record => {
      let parentPlaceholder;
      try {
        parentPlaceholder = record.fields["Tree: Parent Post"][0];
      } catch {
        parentPlaceholder = "";
      }
      records.push({
        id: record.id,
        siblingOrder: record.fields["Organization: Sibling Order"],
        seoPostSummary: record.fields["SEO: Post Summary"],
        link: `${links["treeLink"]}/${record.fields["Slug"]}`,
        subcategory: record.fields["Organization: Subcategory"],
        parentId: parentPlaceholder,
        topic: record.fields["Organization: Topic"],
        premiumContent: record.fields["Article: Is Paid Content?"],
        connections: record.fields["Tree: Connections"],
        category: record.fields["Organization: Category"],
        revision: record.fields["Article: Revision"],
        courseMapName: record.fields["Tree: Name"],
        name: record.fields["Name"],
      });
    });
    return records;
  },
  processRoot: (data, radius) => {
    const root = d3.stratify().id(d => d.id).parentId(d => d.parentId)(data);
    const tree = d3.tree;
    const separation = (a, b) => (a.parent === b.parent ? 1 : 2) / a.depth;
    tree().size([2 * Math.PI, radius]).separation(separation)(root);
    return root;
  },
  filterRecords: (data, filter) => {
    if (filter === "All") return data;
    let filteredData = data.filter(obj => {
      return obj.category === filter;
    });
    let rootData = data.filter(obj => {
      return obj.parentId === '';
    });
    return [...filteredData, ...rootData];
  },
  getTreeRadius: (category)=>{
    if (category === "All") { category = null; }
    switch (category) {
      case "Mathematics":
        return treeUtilities.treeProperties.mathRadiusFactor * treeUtilities.treeProperties.defaultTreeRadius;
      case "Physics":
        return treeUtilities.treeProperties.physicsRadiusFactor * treeUtilities.treeProperties.defaultTreeRadius;
      case "Engineering":
        return treeUtilities.treeProperties.engineeringRadiusFactor * treeUtilities.treeProperties.defaultTreeRadius;
      default:
        return treeUtilities.treeProperties.defaultTreeRadius;
    }
  }
};
